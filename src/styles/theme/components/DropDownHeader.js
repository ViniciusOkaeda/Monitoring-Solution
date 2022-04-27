import styled from "styled-components";

export default styled.div`
    color: ${props => props.theme.dropDownHeader.textColor};
    width: 30px;
    padding: 0.3em 0.1em 0.1em 0.4em;
    border-radius: 10px;
    font-weight: 500;
    font-size: 1.3rem;
    cursor: pointer;
    &:hover {
        background: #0088FE;
        color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 1);
      }
`