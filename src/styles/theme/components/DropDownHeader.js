import styled from "styled-components";

export default styled.div`
    background: ${props => props.theme.dropDownHeader.backgroundColor};
    color: ${props => props.theme.dropDownHeader.textColor};
    margin-bottom: 0.8em;
    width: 30px;
    padding: 0.3em 0.1em 0.1em 0.5em;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 1);
    font-weight: 500;
    font-size: 1.3rem;
    cursor: pointer;
`