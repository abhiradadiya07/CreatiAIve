import React from "react";
import Templates from "@/app/(data)/Template";
import TemplateCard from "./TemplateCard";

export interface Template {
  name: string;
  desc: string;
  category: string;
  icon: string;
  aiPrompt: string;
  slug: string;
  form?: Form[];
}

export interface Form {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

function TemplateListSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
      {Templates.map((item: Template, index: number) => (
        <TemplateCard key={index} {...item} />
      ))}
    </div>
  );
}

export default TemplateListSection;
