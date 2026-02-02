import React from 'react'

const data = [
  { name: 'Aisha', text: 'Great courses and friendly instructors!', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Liam', text: 'Learned React fast — highly recommend.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Maya', text: 'Practical projects and clear explanations.', rating: 4, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
]

export default function Testimonials(){
  return (
    <section className="py-14 bg-gradient-to-r from-white via-sky-50 to-amber-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Loved by learners worldwide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((t,i)=> (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <img src={t.avatar} className="w-12 h-12 rounded-full" alt={t.name} />
                <div>
                  <div className="font-semibold text-slate-900">{t.name}</div>
                  <div className="text-sm text-amber-500">{'⭐'.repeat(t.rating)}</div>
                </div>
              </div>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
