import { Container } from "@mui/material";

export function ContainerLG(props) {
  return (
    <Container maxWidth="lg">
      {props.children}
    </Container>
  );
}
