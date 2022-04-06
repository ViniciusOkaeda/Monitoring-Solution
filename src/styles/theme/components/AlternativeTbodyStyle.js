import styled from "styled-components";

export default styled.div`
    background: ${props => props.theme.alternativeTbody.backgroundColor};
    width: 100%;
    height: 100%;
    color: ${props => props.theme.alternativeTbody.textColor};
  font-size: calc(10px + 2vmin);
`