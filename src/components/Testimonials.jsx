import React from 'react'

const data = [
  { name: 'Aisha', text: 'Great courses and friendly instructors!', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Liam', text: 'Learned React fast — highly recommend.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Maya', text: 'Practical projects and clear explanations.', rating: 4, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
]

export default function Testimonials(){
  return (
    <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">What Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((t,i)=> (
            <div key={i} className="bg-white rounded-xl p-6 shadow">
              <div className="flex items-center gap-3">
                <img src={t.avatar} className="w-12 h-12 rounded-full" alt={t.name} />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-yellow-500">{'⭐'.repeat(t.rating)}</div>
                </div>
              </div>
              <p className="mt-4 text-slate-600">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
