import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Contact = ({ contact }) => (
  <div>
    <h1 className="text-2xl mb-3" style={{ fontFamily: "Merriweather" }}>
      {contact.firstname} {contact.lastname}
    </h1>
    <div className="bg-gray-400 py-2 px-2" cstyle={{ fontFamily: "Roboto" }}>
      <span className="mr-3">{contact.email}</span>
      <span className="mr-3">{contact.phone}</span>
      <span className="mr-3">
        <a href={contact.github}>{contact.github}</a>
      </span>
      <span>
        <a href={contact.linkedin}>{contact.linkedin}</a>
      </span>
    </div>
  </div>
);

const Section = ({ heading, items }) => (
  <div className="mb-1" style={{ fontFamily: "Roboto" }}>
    <h4 className="uppercase text-sm pt-0">{heading}</h4>
    <div className="w-10 h-1 border-t-2 -mt-1"></div>
    {items.map((data) => (
      <div key={data.subtitle} className="">
        <p className="font-bold">{data.title}</p>
        <p>{data.subtitle}</p>
        <ul className="list-disc ml-8">
          {!Array.isArray(data.points)
            ? []
            : data.points.map((point) => <li key={point}>{point}</li>)}
        </ul>
      </div>
    ))}
  </div>
);

const SkillList = ({ type, skills }) => (
  <li>
    {type}: {skills.join(", ")}
  </li>
);
const ListSection = ({ heading, items }) => (
  <div className="mb-1" style={{ fontFamily: "Roboto" }}>
    <h4 className="uppercase text-sm pt-0">{heading}</h4>
    <div className="w-10 h-1 border-t-2 -mt-1"></div>
    <ul className="list-disc ml-8">
      {items.map((item) => (
        <SkillList type={item.type} skills={item.items} key={item.type} />
      ))}
    </ul>
  </div>
);

const Education = ({ schools }) => (
  <div className="mb-1" style={{ fontFamily: "Roboto" }}>
    <h4 className="uppercase text-sm">Education</h4>
    <div className="w-10 h-1 border-t-2 -mt-1"></div>

    {schools.map((school) => (
      <div key={school}>
        <p className="font-bold">{school.institution}</p>
        <p>{school.degree}</p>
        <p>
          {school.major}, {school.graduation_year}
        </p>
      </div>
    ))}
  </div>
);

export default ({ data }) => (
  <div className="my-5 mx-1">
    <Contact
      contact={{
        firstname: data.firstname,
        lastname: data.lastname,
        ...data.contact,
      }}
    />
    {data.education && (
      <Education
        schools={
          !Array.isArray(data.education.schools) ? [] : data.education.schools
        }
      />
    )}
    {data.skills && (
      <ListSection
        heading="Skills"
        items={!Array.isArray(data.skills) ? [] : data.skills}
      />
    )}
    {data.work_experience && (
      <Section
        heading="Work Experience"
        items={
          !Array.isArray(data.work_experience)
            ? []
            : data.work_experience.map((item) => ({
                title: item.title,
                subtitle: `${item.organisation} ${item.from} - ${item.to}`,
                points: [
                  ...(!Array.isArray(item.details) ? [] : item.details),
                  `Technology Used: ${
                    !Array.isArray(item.technology_used?.tools)
                      ? []
                      : item.technology_used?.tools.join(" ")
                  }`,
                ],
              }))
        }
      />
    )}
    {data.github_projects && (
      <Section
        heading="Personal Projects"
        items={
          !Array.isArray(data.github_projects)
            ? []
            : data.github_projects.map((item) => ({
                title: item.project_name,
                subtitle: item.description,
                points: [
                  `Technology Used: ${
                    !Array.isArray(item.technology_used?.tools)
                      ? []
                      : item.technology_used?.tools.join(" ")
                  }`,
                  <a href={item.link}>{item.link}</a>,
                ],
              }))
        }
      />
    )}
    {data.other_projects && (
      <Section
        heading="Other Projects"
        items={
          !Array.isArray(data.other_projects)
            ? []
            : data.other_projects.map((item) => ({
                title: item.headline,
                subtitle: item.description,
                points: [
                  `Technology Used: ${
                    !Array.isArray(item.technology_used?.tools)
                      ? []
                      : item.technology_used?.tools.join(" ")
                  }`,
                ],
              }))
        }
      />
    )}
    {data.other_experience_achievement && (
      <div className="mb-1" style={{ fontFamily: "Roboto" }}>
        <h4 className="uppercase text-sm pt-0">Other Achievements</h4>
        <div className="w-10 h-1 border-t-2 -mt-1"></div>
        <ul className="list-disc ml-8">
          {!Array.isArray(data.other_experience_achievement)
            ? []
            : data.other_experience_achievement.map((item) => (
                <li key={item}>{item}</li>
              ))}
        </ul>
      </div>
    )}
  </div>
);
