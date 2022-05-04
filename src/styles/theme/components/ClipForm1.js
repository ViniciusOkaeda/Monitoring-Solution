import styled from "styled-components";

export default styled.div`
    background: ${props => props.theme.clipForm1.backgroundColor};
    clip-path: circle(45% at 100% 20%);
    width: 100%;
    position: relative;
    border-radius: 10px;
    height: 100%;
`