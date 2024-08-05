import React, { ReactNode, useState } from "react";
import "./Accordion.scss";

interface AccordionProps {
  children: ReactNode;
  content: ReactNode;
}

export default function Accordion({ children, content }: AccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="accordion">
      <div
        className="accordion__headline"
        onClick={() => setIsOpen((open) => !open)}
      >
        {children}
        <div className="accordion__arrow">{isOpen ? "⬆️" : "⬇️"}</div>
      </div>
      {isOpen && <div className="accordion__content">{content}</div>}
    </div>
  );
}
