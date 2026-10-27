// styles
import styles from "@/components/ui/card/CardHighlighted.module.css";

// components ui
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/shadcn/card";

// hooks & utils
import { cn } from "@/lib/utils";

interface CardHighlightedProps {
  divClass?: string;
  cardClass?: string;
  cardType: "Form" | "Subscribe" | "JoinUs" | "Vertical" | "Horizontal";

  icon?: React.ReactNode;
  title?: React.ReactNode;
  titleClass?: string;
  content?: React.ReactNode;
  contentClass?: string;
  description?: React.ReactNode;
  descriptionClass?: string;
  footer?: React.ReactNode;
  footerClass?: string;
  /** Extra attributes for the outer element (e.g. scroll reveal props). */
  rootProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function CardHighlighted({
  divClass,
  cardClass,
  cardType,
  icon,
  title,
  titleClass,
  content,
  contentClass,
  description,
  descriptionClass,
  footer,
  footerClass,
  rootProps,
}: CardHighlightedProps) {
  return (
    <div {...rootProps} className={cn(divClass, styles[`${cardType}CardHighlighted`])}>
      <Card className={cn(cardClass, styles[`${cardType}CardHighlighted2`])}>
        <CardHeader>
          {icon && <CardTitle className={titleClass}>{icon}</CardTitle>}
          {title && <CardTitle className={titleClass}>{title}</CardTitle>}
        </CardHeader>
        <div>
          {description && (
            <div className={cn("text-sm text-slate-400", descriptionClass)}>{description}</div>
          )}
          {content && <CardContent className={contentClass}>{content}</CardContent>}
        </div>

        {footer && (
          <div className={footerClass}>
            <CardFooter>{footer}</CardFooter>
          </div>
        )}
      </Card>
    </div>
  );
}
