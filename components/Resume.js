import React from "react";
const Contact = ({ info }) => {
  let infoKV = Object.entries(info);
  return infoKV.map(([k, v], idx) => (
    <span key={k}>
      {v} {idx < infoKV.length - 1 ? <b className="font-extrabold"> | </b> : ""}
    </span>
  ));
};

//injecting request data to template string html
const Resume = ({ data }) => (
  <div className="m-8 boxed">
    <center>
      <h1 style={{ fontSize: "initial", margin: "1rem 0" }}>
        {data.firstname} {data.lastname}
      </h1>
      <h4
        className="light m-m-t-10"
        style={{ color: "grey", paddingTop: "5px" }}
      >
        <Contact info={data.contact} />
      </h4>
    </center>

    <hr className="thick" />
    <h4 className="">TECHNICAL SKILLS</h4>
    <div className="offset-2">
      {Array.isArray(data.skills) &&
        data.skills.map((key) => (
          <p key={key.type}>
            <strong>{key.type}:</strong> {key.items.join(", ")}
          </p>
        ))}
    </div>
    <h4 className="">PERSONAL PROJECTS</h4>
    <div className="offset-2">
      {Array.isArray(data.github_projects) &&
        data.github_projects.map((key) => (
          <div key={key["project_name"]}>
            <p>
              <strong className="title">
                {key["project_name"]} <a href={key.link}>{key.tagline}</a>
              </strong>
            </p>
            <div className="offset-2 p">
              {" "}
              {key["description"][0]} Technologies:{" "}
              {key["technology_used"].tools.join(", ")}
            </div>
          </div>
        ))}
    </div>
    <h4 className="">OTHER PROJECTS</h4>
    {Array.isArray(data.other_projects) &&
      data.other_projects.map((key) => (
        <div>
          <p>
            <strong className="title">{key["headline"]}</strong>
          </p>
          <div className="offset-2 p">
            {" "}
            {key["description"]} Technologies:{" "}
            {key["technology_used"].tools.join(", ")}
          </div>
        </div>
      ))}

    <h4 className="">PROFESSIONAL EXPERIENCE</h4>
    <div className="offset-2">
      {Array.isArray(data.work_experience) &&
        data.work_experience.map((key) => (
          <div key={key.details[0]}>
            <p>
              <strong className="title">
                {`${key["title"]}, ${key["organisation"]}, ${key["location"]}`}
                <span className="pull-right">
                  {key["from"]} - {key["to"]}
                </span>
              </strong>
            </p>
            <div className="offset-2 p">
              {key["details"][0]} Technologies:{" "}
              {key["technology_used"].tools.join(", ")}
            </div>
          </div>
        ))}
    </div>

    <h4 className="">EDUCATION</h4>
    <div className="">
      <table cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Degree</th>
            <th>Major</th>
            <th>Institution</th>
            <th>graduation Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.education.schools.map(function (key) {
              return (
                <>
                  <td>{key["degree"]}</td>
                  <td>{key["major"]}</td>
                  <td>{key["institution"]}</td>
                  <td>{key["graduation_year"]}</td>
                </>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
    <div style={{ margin: "1rem 0" }}>
      <h4 className="">OTHER EXPERIENCE</h4>
      <div className="offset-2">
        {Array.isArray(data.other_experience_achievement) &&
          data.other_experience_achievement.map(function (key) {
            return <p key={key}>{key}</p>;
          })}
      </div>
    </div>
  </div>
);

export default Resume;
