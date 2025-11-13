import { Cv, GetInTouch } from "@payload-types"
import React from "react"
import { CMSLink } from "../Link"
import { Icon } from "../Icon"
import { DisplayDate } from "../Date"
import { Blocks } from "../Blocks"

type CuriculumVitaeProps = {
  data: Cv
  getInTouch: GetInTouch
}

export const CuriculumVitae: React.FC<CuriculumVitaeProps> = async ({ data, getInTouch }) => {
  const {
    infos,
    id,
    skills: { pages },
  } = data

  const { contactInfos, candidateName } = getInTouch

  return (
    <div className="flex justify-center py-6">
      <main
        id={`element-to-generate-pdf-${id}`}
        className="bg-white w-full max-w-[850px] aspect-[8.5/11] shadow-lg rounded-xl font-sans overflow-y-auto print:shadow-none print:rounded-none print:p-0"
      >
        {/* HEADER */}
        <header className="bg-blue-950 pb-3 pt-6 px-8">
          <div className="">
            <h2 className="text-3xl font-bold text-white leading-none !m-0">{candidateName}</h2>
            <h4 className="text-white leading-none font-normal !mt-2">{infos?.jobTitle}</h4>
          </div>
        </header>
        <section className="grid grid-cols-5">
          <div className="col-span-2">
            <div className=" bg-gray-100 h-fit">
              <div className="pl-8 py-2">
                {contactInfos?.map((contactInfo) => (
                  <div key={contactInfo.id} className="flex items-center gap-2">
                    <div>
                      <Icon className="w-4 h-4" name={contactInfo.type} />
                    </div>
                    <div key={contactInfo.id}>
                      {!contactInfo.isLink ? (
                        <p className="!m-0">{contactInfo.value}</p>
                      ) : (
                        <CMSLink size="xxs-clear" currentUrl="" {...contactInfo.link} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LEFT COLUMN */}
            <div className="">
              {/* COMPETENCES */}
              {pages?.map((page) => (
                <div key={page.id}>
                  <div className="ml-8">
                    <h4 className="border-b border-gray-200  text-lg  mb-2">
                      {page.competences?.tabName}
                    </h4>
                    <ul className="text-sm space-y-1">
                      {page.competences?.softSkills?.map((skill) => (
                        <li key={skill.id}>{skill.title}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="ml-8">
                    <div className="pt-4 flex flex-wrap gap-x-2 gap-y-1">
                      {page.competences?.hardSkills?.map((skill) => (
                        <h5 className="" key={skill.id}>
                          {skill.title}
                        </h5>
                      ))}
                    </div>
                  </div>
                  <div className="ml-8">
                    <h4 className="border-b border-gray-200">{page.education.tabName}</h4>
                    <div>
                      {page.education.education.map((education) => (
                        <div key={education.id}>
                          <h5>{education?.program}</h5>
                          {education?.school && <p className="!m-0">{education?.school}</p>}

                          {education?.startDate && (
                            <div className="flex items-center gap-1 mt-1 mb-2">
                              <DisplayDate
                                display={{
                                  month: false,
                                  year: true,
                                  day: false,
                                }}
                                date={education?.startDate}
                                showDot={!!education?.endDate}
                              />
                              <DisplayDate
                                display={{
                                  month: false,
                                  year: true,
                                  day: false,
                                }}
                                showCalendarIcon={false}
                                date={education?.endDate}
                              />
                            </div>
                          )}
                          <Blocks blocks={education?.content} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-3 space-y-8 mx-8">
            <div>
              {pages?.map((page) => (
                <div key={page.id}>
                  <h4 className="border-b border-gray-200 text-lg mb-3">
                    {page.experiences?.tabName}
                  </h4>
                  {page.experiences?.experience?.map((experience) => (
                    <div key={experience.id}>
                      <h5>{experience.title}</h5>
                      <div className="flex items-center gap-1 h-fit">
                        <p className="font-semibold italic !m-0">{experience?.company}</p>
                        <span>-</span>
                        <CMSLink size="xxs-clear" currentUrl="" {...experience?.link} />
                      </div>
                      <div className="flex items-center gap-1">
                        <DisplayDate
                          display={{
                            month: false,
                            year: true,
                            day: false,
                          }}
                          date={experience?.startDate}
                          showDot={!!experience?.endDate}
                        />
                        <DisplayDate
                          display={{
                            month: false,
                            year: true,
                            day: false,
                          }}
                          showCalendarIcon={false}
                          date={experience?.endDate}
                        />
                      </div>
                      <Blocks blocks={experience?.content} />
                    </div>
                  ))}
                </div>
              ))}

              <div className="space-y-6 text-sm">
                {/*               

 
                <div>
                  <h5 className="font-bold">Développeur Web (Stage)</h5>
                  <p className="text-gray-600">
                    <a href="https://beta.partago.app" className="text-blue-600 hover:underline">
                      Partago
                    </a>{" "}
                    — (2023 — en cours)
                  </p>
                  <ul className=" mt-1 space-y-1">
                    <li>Développement d’une application PWA pour la redistribution de dépenses</li>
                    <li>Stack : Next.js, NextAuth, TypeScript, tRPC, Drizzle, SQL</li>
                    <li>Mise en place d’un système d’authentification</li>
                    <li>Gestion de pipelines CI/CD</li>
                    <li>Encadrement technique de l’équipe</li>
                  </ul>
                </div>

         
                <div>
                  <h5 className="font-bold">Commis au sport</h5>
                  <p className="text-gray-600">
                    Canadian Tire (Saint-Bruno / Montréal) — 2017 — en cours
                  </p>
                  <ul className="mt-1 space-y-1">
                    <li>Gestion de l’équipe</li>
                    <li>Service à la clientèle</li>
                    <li>Marchandisage et remplissage des rangées</li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
