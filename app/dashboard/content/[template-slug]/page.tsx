import React from "react";
import FormSection from "../_component/FormSection";
import OutputSection from "../_component/OutputSection";
import { Template } from "../../_component/TemplateListSection";
import Templates from "@/app/(data)/Template";

interface Props {
  params: {
    "template-slug": string;
  };
}
function CreateNewContent(props: Props) {
  const selectedTemplate: Template | undefined = Templates?.find(
    (item) => item.slug === props.params["template-slug"]
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-5">
      {/* Form Section */}
      <FormSection selectedTemplate={selectedTemplate} />
      <div className="col-span-2">
        <OutputSection />
      </div>
      {/* Output Section */}
    </div>
  );
}

export default CreateNewContent;
