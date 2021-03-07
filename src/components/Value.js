import ability from './img/능력발휘.png';
import money from './img/보수.png';
import socialHelp from './img/사회봉사.png';
import socialRespect from './img/사회적인정.png';
import steady from './img/안정성.png';
import growth from './img/자기계발.png';
import self from './img/자율성.png';
import creative from './img/창의성.png';

import {Row, Table} from 'reactstrap';

export default function Value(props) {
  const valueData = [
    ["능력발휘","능력을 충분히 발휘할 수 있을 때 보람과 만족을 느낍니다.", "능력을 충분히 발휘할 수 있는 기회와 가능성이 주어지는 직업", "직업생활에서의 경쟁은 나를 도전적으로 만들어주고, 어려운 일을 하나씩 해결해 나가는 과정에서 성취감을 느낍니다.", ability],
    ["자율성","어떤 일을 할 때 규칙, 절차, 시간 등을 스스로 결정하길 원합니다.", "일하는 방식과 스타일이 자유로운 직업", "자신만의 방식에 맞게 자율적으로 일할 때 능력을 더욱 효과적으로 발휘합니다.", self],
    ["보수","충분한 경제적 보상이 매우 중요하다고 생각합니다.", "노력과 성과에 대해 충분한 경제적 보상이 주어지는 직업", "충분한 보수를 받는다면 일의 어려움과 힘겨움에 관계없이 최선을 다해 노력할 것입니다.", money],
    ["안정성","매사가 계획한대로 안정적으로 유지되는 것을 좋아합니다.", "쉽게 해고되지 않고 오랫동안 일할 수 있는 직업", "안정적인 직업생활이 보장된다면 편안한 마음으로 더욱 열심히 일을 합니다.", steady],
    ["사회적인정", "다른 사람들로부터 나의 능력과 성취를 충분히 인정받고 싶어합니다.", "많은 사람들로부터 주목받고 인정받을 수 있는 직업", "주변 사람들의 긍정적인 평가가 능력발휘에 더욱 도움이 됩니다.", socialRespect],
    ["사회봉사", "다른 사람을 돕고 더 나은 세상을 만들고 싶습니다.", "사람, 조직, 국가, 인류에 대한 봉사와 기여가 가능한 직업", "도움과 격려가 필요한 사람들에게 힘을 줄 수 있는 직업생활을 할 때 가치와 보람을 느낍니다.", socialHelp],
    ["자기계발", "항상 새로운 것을 배우고 스스로 발전해 나갈 때 만족을 느낍니다.", "능력과 소질을 지속적으로 발전시킬 수 있는 직업", "스스로가 발전할 수 있는 기회가 충분히 주어지는 직업생활을 할 때 만족감을 느낍니다.", growth],
    ["창의성", "예전부터 해오던 것 보다는 새로운 것을 만들어 내는 것을 매우 좋아합니다.", "늘 변화하고 혁신적인 아이디어를 내며, 창조적인 시도를 하는 직업", "새롭고 독창적인 것을 만들어 내는 과정에서 능력을 발휘할 수 있습니다.", creative]
  ];

  return (
    <Row id="value-row">
                <div className='img'>
                    <img alt={valueData[props.num][0]} src={valueData[props.num][4]}/>
                    <p id="value-p">{valueData[props.num][0]}</p>
                </div>
                    
                <Table id="value-table" size="sm">
                    <tbody>
                        <tr>
                            <th scope="row" className="value-standard">특징</th>
                            <td>{valueData[props.num][1]}</td>
                        </tr>
                        <tr>
                            <th scope="row">직업선택</th>
                            <td>{valueData[props.num][2]}</td>
                        </tr>
                        <tr>
                            <th scope="row">직업생활</th>
                            <td>{valueData[props.num][3]}</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
  )
}

