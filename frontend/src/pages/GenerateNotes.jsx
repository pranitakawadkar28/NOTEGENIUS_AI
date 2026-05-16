import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Sparkles, BookOpen, GraduationCap, Zap, Microscope, Layout, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react'
import { Button, Input, Label } from '@/components/ui/AuthPrimitives'
import { Select, Switch } from '@/components/ui/FormComponents'
import GenerationLoader from '@/components/dashboard/GenerationLoader'
import { generateNote, selectIsGenerating } from '@/features/notes/notesSlice'
import { selectCurrentUser } from '@/features/auth/authSlice'

const generateSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters'),
  classLevel: z.string(),
  examType: z.string(),
  revisionMode: z.boolean(),
  includeDiagram: z.boolean(),
  includeChart: z.boolean(),
})

const CLASS_OPTIONS = [
  { label: 'Secondary School', value: 'secondary' },
  { label: 'Higher Secondary (11th-12th)', value: 'higher_secondary' },
  { label: 'Undergraduate', value: 'undergrad' },
  { label: 'Postgraduate', value: 'postgrad' },
]

const EXAM_OPTIONS = [
  { label: 'Standard Board Exams', value: 'board' },
  { label: 'University Exams', value: 'university' },
  { label: 'Competitive Exams (JEE/NEET)', value: 'competitive' },
  { label: 'Professional Certifications', value: 'professional' },
]

export default function GenerateNotes() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector(selectIsGenerating)
  const user = useSelector(selectCurrentUser)
  const canGenerate = (user?.credits ?? 0) >= 10

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      classLevel: 'higher_secondary',
      examType: 'board',
      revisionMode: false,
      includeDiagram: true,
      includeChart: false,
    }
  })

  const onSubmit = async (data) => {
    const resultAction = await dispatch(generateNote(data))
    if (generateNote.fulfilled.match(resultAction)) {
      const newNote = resultAction.payload.data
      navigate(`/notes/${newNote._id || newNote.id}`)
    }
  }

  if (isLoading) {
    return <GenerationLoader />
  }

  return (
    <div className="space-y-10 animate-fade-in pb-10 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Create Study Guide
          </h1>
          <p className="text-[var(--text-secondary)]">Transform any topic into a high-quality study guide.</p>
        </div>
        
        <div className="bg-[var(--bg-secondary)] px-6 py-3 rounded-2xl flex items-center gap-4 border border-[var(--border-primary)] shadow-sm">
          <Zap size={20} className="text-brand-500" fill="currentColor" />
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Credits</p>
              <p className="text-xl font-bold text-[var(--text-primary)]">{user?.credits ?? 0}</p>
            </div>
            {!canGenerate && (
              <Link to="/billing">
                <Button size="sm" variant="outline" className="h-8 rounded-xl text-[10px] uppercase tracking-widest font-black border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">Top Up</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-[var(--bg-secondary)] rounded-[2rem] p-8 border border-[var(--border-primary)] shadow-sm space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic / Subject</Label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" />
                <Input 
                  id="topic" 
                  placeholder="e.g. Quantum Physics..." 
                  className="pl-12 bg-[var(--bg-tertiary)]/50"
                  {...register('topic')}
                />
              </div>
              {errors.topic && <p className="text-xs text-rose-500 font-bold">{errors.topic.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="classLevel">Target Level</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)] z-10" />
                  <Select id="classLevel" options={CLASS_OPTIONS} className="pl-12" {...register('classLevel')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="examType">Exam Context</Label>
                <div className="relative">
                  <Layout className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)] z-10" />
                  <Select id="examType" options={EXAM_OPTIONS} className="pl-12" {...register('examType')} />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[var(--border-primary)]">
              <Controller
                name="revisionMode"
                control={control}
                render={({ field }) => (
                  <Switch label="Quick Revision Mode" checked={field.value} onChange={field.onChange} />
                )}
              />
              <Controller
                name="includeDiagram"
                control={control}
                render={({ field }) => (
                  <Switch label="Smart Diagrams" checked={field.value} onChange={field.onChange} />
                )}
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading || !canGenerate} 
              className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white rounded-xl shadow-lg shadow-brand-500/20 disabled:opacity-50 transition-all font-bold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Synthesizing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Master Guide
                </>
              )}
            </Button>

            {!canGenerate && (
              <div className="mt-4 p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap size={14} className="text-rose-500" />
                  <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest">Insufficient Credits</p>
                </div>
                <Link to="/billing" className="text-[10px] font-black text-brand-500 uppercase tracking-widest hover:underline">
                  Top Up &rarr;
                </Link>
              </div>
            )}
          </form>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[var(--bg-secondary)] rounded-[2rem] p-8 border border-[var(--border-primary)] shadow-sm">
            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-3 mb-6">
              <Microscope size={20} className="text-brand-500" />
              Pro Tips
            </h3>
            <ul className="space-y-4">
              {[
                'Be specific with your topic for better results.',
                'Use "Revision Mode" for quick summaries.',
                'Diagrams are great for complex subjects.',
                'Each generation is unique to your level.'
              ].map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="h-6 w-6 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-muted)] flex items-center justify-center shrink-0 text-xs font-bold">{i+1}</span>
                  <p className="text-sm text-[var(--text-secondary)]">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
