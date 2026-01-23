export const fetchBoardMembers = async (t: TrelloInstance): Promise<TrelloMember[]> => {
  try {
    const board = await t.board('members') as Record<string, unknown> & { members?: (TrelloMember & { avatar?: string })[] };
    const members = board.members || [];
    return members.map((m) => ({
      id: m.id,
      fullName: m.fullName,
      username: m.username,
      avatarUrl: m.avatar,
      initials: m.initials,
    }));
  } catch (err) {
    console.error('Failed to fetch board members', err);
    throw err;
  }
};

export const fetchAllCardsWithChecklists = async (t: TrelloInstance): Promise<TrelloCard[]> => {
  try {
    const restApi = t.getRestApi();
    let isAuthorized = await restApi.isAuthorized();

    if (!isAuthorized) {
      try {
        await restApi.authorize({ scope: 'read' });
        isAuthorized = true;
      } catch (authErr) {
        console.warn('Authorization failed or user declined', authErr);
      }
    }

    if (isAuthorized) {
      const board = await t.board('id');
      // Use REST API to fetch cards with full checklists (including checkItems) in one request
      const token = await restApi.getToken();
      const appKey = 'f23a4b4318d7a4f0c74816c3b595be78';
      const response = await fetch(`https://api.trello.com/1/boards/${board.id}/cards?checklists=all&checkItem_fields=all&fields=name,labels,members&member_fields=fullName,username,avatar&labels=all&key=${appKey}&token=${token}`);
      
      if (!response.ok) {
        throw new Error(`Trello API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    }
  } catch (err) {
    console.warn('REST API not available or not authorized, falling back to t.cards()', err);
  }

  // Fallback to Power-Up client library (likely missing checkItems)
  return await t.cards('id', 'name', 'checklists', 'labels', 'members');
};

export const updateChecklistItemState = async (
  t: TrelloInstance,
  cardId: string,
  checklistId: string,
  checkItemId: string,
  state: 'complete' | 'incomplete'
): Promise<void> => {
  try {
    const restApi = t.getRestApi();
    const isAuthorized = await restApi.isAuthorized();

    if (isAuthorized) {
      const token = await restApi.getToken();
      const appKey = 'f23a4b4318d7a4f0c74816c3b595be78';
      
      const response = await fetch(
        `https://api.trello.com/1/cards/${cardId}/checklist/${checklistId}/checkItem/${checkItemId}?key=${appKey}&token=${token}&state=${state}`,
        {
          method: 'PUT',
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update check item state: ${response.status} ${response.statusText}`);
      }
      
      console.log(`Successfully updated ${checkItemId} to ${state}`);
    } else {
      console.warn('User not authorized to update checklist item via REST API');
      // Potential fallback: ask for auth or try t.set() if meaningful, 
      // but t.set() is for plugin data, not core Trello data.
    }
  } catch (err) {
    console.error('Error updating checklist item state', err);
    throw err;
  }
};
