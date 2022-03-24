import styled from "styled-components";

export default styled.div`
    background: ${props => props.theme.alternativeThead.backgroundColor};
    width: 100%;
    height: 100%;
    color: ${props => props.theme.alternativeThead.textColor};
  font-size: calc(10px + 2vmin);
`