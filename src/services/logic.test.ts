import { describe, it, expect } from 'vitest';
import { filterAndGroupItems } from './logic';

describe('Logic Service', () => {
  const mockCards: TrelloCard[] = [
    {
      id: 'c1',
      name: 'Card 1',
      labels: [{ name: 'Project B' }],
      members: [],
      checklists: [
        {
          id: 'cl1',
          name: 'CL 1',
          checkItems: [
            { id: 'i1', name: 'Task 1 @kai', state: 'incomplete' },
            { id: 'i2', name: 'Task 2', state: 'incomplete' },
          ],
        },
      ],
    },
    {
      id: 'c2',
      name: 'Card 2',
      labels: [{ name: 'Project A' }],
      members: [],
      checklists: [
        {
          id: 'cl2',
          name: 'CL 2',
          checkItems: [
            { id: 'i3', name: 'Fix this @kai', state: 'incomplete' },
          ],
        },
      ],
    },
    {
        id: 'c3',
        name: 'Card 3',
        labels: [], // No label
        members: [],
        checklists: [
          {
            id: 'cl3',
            name: 'CL 3',
            checkItems: [
              { id: 'i4', name: 'No label @kai', state: 'incomplete' },
            ],
          },
        ],
      },
  ];

  it('filters by @username and groups by label name, sorted alphabetically', () => {
    const result = filterAndGroupItems(mockCards, '@kai');
    
    // Group A comes first, then B, then "No Project" (or however we handle it)
    expect(result[0].projectName).toBe('Project A');
    expect(result[1].projectName).toBe('Project B');
    expect(result[2].projectName).toBe('No Project');

    expect(result[0].items).toHaveLength(1);
    expect(result[0].items[0].name).toBe('Fix this @kai');
    
    expect(result[1].items).toHaveLength(1);
    expect(result[1].items[0].name).toBe('Task 1 @kai');

    expect(result[2].items).toHaveLength(1);
    expect(result[2].items[0].name).toBe('No label @kai');
  });

  it('is case-insensitive for username search', () => {
    const result = filterAndGroupItems(mockCards, '@KAI');
    expect(result.some(g => g.items.length > 0)).toBe(true);
  });
});
