// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from '../../lib/supabaseClient'

async function run() {
  const { data, error } = await supabase
    .from('recommendations')
    .select('repo_name, total_stars, avg_recency_score')
    .order('total_stars', { ascending: false })

  if (error || !data) {
    throw error || new Error('No data')
  }

  return data
}

export default function handler(req, res) {
  run().then(data => {
    res.status(200).json(data)
  }).catch(error => {
    console.log(error)
    res.status(500).json({ error })
  });
}
