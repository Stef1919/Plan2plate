
export function NutritionBadge({ calories, protein, carbs }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.75rem' }}>
      <div style={{ backgroundColor: '#fff7ed', color: '#c2410c', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        <span>🔥</span> {calories} kcal
      </div>
      <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '0.25rem 0.5rem', borderRadius: '0.375rem' }}>
        {protein}g P
      </div>
      <div style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '0.25rem 0.5rem', borderRadius: '0.375rem' }}>
        {carbs}g C
      </div>
    </div>);

}