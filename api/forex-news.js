function getValue(block, tag) {
  const regex = new RegExp(
    `<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}>([\\s\\S]*?)<\\/${tag}>`
  );
  const match = block.match(regex);
  return match ? (match[1] || match[2] || '').trim() : '-';
}

export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://nfs.faireconomy.media/ff_calendar_thisweek.xml'
    );

    const xml = await response.text();
    const events = [...xml.matchAll(/<event>([\s\S]*?)<\/event>/g)];

    const data = events
      .map((event) => {
        const block = event[1];

        return {
          title: getValue(block, 'title'),
          country: getValue(block, 'country'),
          date: getValue(block, 'date'),
          time: getValue(block, 'time'),
          impact: getValue(block, 'impact'),
          forecast: getValue(block, 'forecast'),
          previous: getValue(block, 'previous'),
          actual: getValue(block, 'actual'),
        };
      })
      .filter(
        (item) =>
          item.country === 'USD' &&
          item.impact.toLowerCase().includes('high')
      );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data ForexFactory',
    });
  }
}