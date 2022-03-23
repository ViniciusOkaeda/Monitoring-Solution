import styled from "styled-components";

export default styled.div`
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.textColor};
    min-height: 100vh;
  font-size: calc(10px + 2vmin);
  `