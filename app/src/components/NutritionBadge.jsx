

export function NutritionBadge({ calories, protein, carbs, lifestyle }) {
  return (
    <div style={{ marginTop: '0.75rem', borderTop: '1px solid #f3f4f6', paddingTop: '0.625rem' }}>
      {lifestyle &&
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem', color: '#9ca3af', fontWeight: 500, marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <span>{lifestyle.emoji}</span>
          <span>Adjusted for {lifestyle.name}</span>
        </div>
      }
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 500, flexWrap: 'wrap' }}>
        <div style={{ backgroundColor: '#fff7ed', color: '#c2410c', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span>🔥</span> {calories} kcal
        </div>
        <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '0.25rem 0.5rem', borderRadius: '0.375rem' }}>
          {protein}g P
        </div>
        <div style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '0.25rem 0.5rem', borderRadius: '0.375rem' }}>
          {carbs}g C
        </div>
      </div>
    </div>);

}