// components ui
import { CardHighlighted } from "@/components/ui/card/CardHighlighted";

export interface Job {
  id: string;
  title: string;
  description: React.ReactNode;
  content: string;
  footer: React.ReactNode;
}

interface JoinUsCardProps {
  jobs: Job[];
}

export function JoinUsCard({ jobs }: JoinUsCardProps) {
  return (
    <div className="flex gap-8">
      {jobs.map((job) => (
        <CardHighlighted
          key={job.id}
          cardType="JoinUs"
          cardClass="bg-card-background text-white border border-slate-800 items-center p-4"
          title={job.title}
          titleClass="text-center text-2xl pt-2 px-2"
          description={job.description}
          descriptionClass="flex flex-col items-center px-2"
          content={job.content}
          contentClass="text-center"
          footer={job.footer}
          footerClass="flex justify-center w-full"
        />
      ))}
    </div>
  );
}
