import React from 'react';

import './index.css';

import AlternativeTheadStyle from '../../styles/theme/components/AlternativeTheadStyle';

export default function Table() {


    return(
            <table >
                <tbody>
                <thead >
                    <AlternativeTheadStyle style={{height: 60, margin: 'auto'}}>
                        <tr>
                            <th >
                                <h4>aq</h4>
                            </th>
                            <th>
                                aq
                            </th>

                        </tr>
                    </AlternativeTheadStyle>
                </thead>

                    <td>
                        a
                    </td>
                </tbody>
            </table>
    );
}

