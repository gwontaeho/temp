import {
  Container,
  Title,
  Article,
  Section,
  SkillTitle,
  Skill,
} from "./styles";
import { skills } from "../../../data";

const Skills = () => {
  return (
    <Container>
      <Title>S k i l l s</Title>
      <Article>
        <Section>
          <SkillTitle>FRONT</SkillTitle>
          {skills.front.map((skill) => (
            <Skill key={skill.name}>
              <div>{skill.icon}</div>
              <span>{skill.name}</span>
            </Skill>
          ))}
        </Section>
        <Section>
          <SkillTitle>BACK</SkillTitle>
          {skills.back.map((skill) => (
            <Skill key={skill.name}>
              <div>{skill.icon}</div>
              <span>{skill.name}</span>
            </Skill>
          ))}
        </Section>
        <Section>
          <SkillTitle>ETC</SkillTitle>
          {skills.etc.map((skill) => (
            <Skill key={skill.name}>
              <div>{skill.icon}</div>
              <span>{skill.name}</span>
            </Skill>
          ))}
        </Section>
      </Article>
    </Container>
  );
};

export default Skills;
