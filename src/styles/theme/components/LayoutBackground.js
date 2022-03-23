import styled from "styled-components";

export default styled.div`
    background: ${props => props.theme.layoutColor.background};
    color: ${props => props.theme.layoutColor.textColor};
    min-height: 100vh;
  font-size: calc(10px + 2vmin);
`