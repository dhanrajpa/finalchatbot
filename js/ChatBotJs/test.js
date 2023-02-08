const cuisines = [
    { id: 2, name: 'Indian' },
    { id: 4, name: 'Mexican' },
    { id: 5, name: 'Mediterranean' },
    { id: 6, name: 'Middle Eastern' },
    { id: 7, name: 'Chinese' },
    { id: 8, name: 'Japanese' },
    { id: 9, name: 'Italian' },
    { id: 10, name: 'Pick for Me' },
    { id: 16, name: 'BBQ' },
];
const selected = [
    { cuisine_id: 6, id: 1260 },
    { cuisine_id: 16, id: 1262 },
    { cuisine_id: 8, id: 1268 },
    { cuisine_id: 10, id: 1269 },
];
const result = cuisines.filter(c => selected.some(s => s.cuisine_id === c.id));
console.log(result);