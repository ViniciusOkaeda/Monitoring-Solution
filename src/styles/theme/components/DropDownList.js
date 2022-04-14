import styled from "styled-components";

export default styled.ul`
    background: ${props => props.theme.dropDownList.backgroundColor};
    color: ${props => props.theme.dropDownList.textColor};
    padding: 0;
    margin: 0;
    padding: 0.4em 3em 0.4em 1em;
    border: 2px solid ${props => props.theme.dropDownList.backgroundColor};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    position: absolute;
    font-size: 1.3rem;
    font-weight: 500;
    &:first-child {
      padding-top: 0.8em;
    }
`