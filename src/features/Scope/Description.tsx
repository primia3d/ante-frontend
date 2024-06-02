import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/HoverCard';

type DescriptionProps = {
  description: string;
};

export default function Description({ description }: DescriptionProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="truncate">{description}</div>
      </HoverCardTrigger>
      <HoverCardContent className="w-full max-w-sm">
        <div className="break-words">{description}</div>
      </HoverCardContent>
    </HoverCard>
  );
}
