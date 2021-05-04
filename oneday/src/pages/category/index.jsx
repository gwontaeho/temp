import { Container, Header } from "./styles";
import { useEffect } from "react";
import axios from "axios";

const Category = ({ match }) => {
  useEffect(async () => {
    const category = match.params.category;

    try {
      const response = await axios.post("/api/loadcategory", {});
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container>
      <Header>전체</Header>
    </Container>
  );
};

export default Category;
