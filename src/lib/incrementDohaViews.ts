// src/lib/incrementDohaViews.ts

function hasDohaBeenViewed(dohaId: string): boolean {
  const viewedDohas = sessionStorage.getItem('viewedDohas')
  return viewedDohas !== null && viewedDohas.split(',').includes(`${dohaId}`)
}

function markDohaAsViewed(dohaId: string): void {
  const viewedDohas = sessionStorage.getItem('viewedDohas')
  const updatedViewedDohas = viewedDohas ? `${viewedDohas},${dohaId}` : dohaId
  sessionStorage.setItem('viewedDohas', updatedViewedDohas)
}

export async function incrementDohaViews(dohaId: string) {
  if (hasDohaBeenViewed(dohaId)) {
    return
  }

  try {
    const response = await fetch('/api/doha/incrementviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({dohaId}),
    })

    if (response.ok) {
      markDohaAsViewed(dohaId)
    } else {
      console.error(
        'Error incrementing Doha view count:',
        await response.text()
      )
    }
  } catch (error) {
    console.error('Error incrementing Doha view count:', error)
  }
}
