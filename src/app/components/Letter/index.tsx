import { GetInTouch, Letter as LetterType } from "@payload-types"
import React from "react"
import { DisplayDate } from "../Date"
import { Blocks } from "../Blocks"
import { capitalize } from "@app/utilities/strings/catpitalize"

type LetterProps = {
  data: LetterType
  getInTouch: GetInTouch
}

export const Letter: React.FC<LetterProps> = async ({ data, getInTouch }) => {
  const { id, company, letter } = data
  const { contactInfos, candidateName } = getInTouch

  return (
    <div className="flex justify-center py-6">
      <main
        id={`element-to-generate-pdf-${id}`}
        className="relative bg-white w-full max-w-[850px] aspect-[8.5/11] shadow-lg rounded-xl font-sans overflow-y-auto print:shadow-none print:rounded-none print:p-0"
      >
        <div className="bg-blue-950 h-6"></div>
        <header className="mx-10 pt-4 pb-6">
          <DisplayDate
            date={new Date().toISOString()}
            showCalendarIcon={false}
            className="text-foreground italic"
          />
          {company?.name && <p className="!m-0 !mt-1 leading-none ">{capitalize(company?.name)}</p>}
          {company?.address && <p className="!m-0 !mt-1 leading-none">{company?.address}</p>}
          {company?.city && (
            <p className="!m-0 !mt-1 leading-none">
              {company?.city} {company?.country}
            </p>
          )}
          {company?.zip && <p className="!m-0 !mt-1 leading-none">{company?.zip}</p>}
        </header>
        <section className="mx-10">
          <h5 className="pb-8 !text-[0.8rem] leading-none">{letter?.subject}</h5>
          {letter?.content && <Blocks blocks={letter?.content} />}
        </section>
        <footer className="mx-10 pt-16">
          {candidateName && <p className="!m-0 font-bold !mt-1 leading-none">{candidateName}</p>}
          {contactInfos.map((el) => (
            <p key={el.id} className="!m-0 !mt-1 leading-none">
              {el.value}
            </p>
          ))}
        </footer>
        <div className="absolute bottom-0 left-0 right-0 bg-blue-100 h-4"></div>
      </main>
    </div>
  )
}
