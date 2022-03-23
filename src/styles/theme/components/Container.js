import styled from "styled-components";

export default styled.div`
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.textColor};
    box-shadow: ${props => props.theme.colors.boxShadow};
    min-height: 10px;
  font-size: calc(10px + 2vmin);
`