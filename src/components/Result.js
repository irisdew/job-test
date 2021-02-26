import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar'

export default function Result(props){
    const [seq, setSeq] = useState();
    const [result, setResult] = useState({});
    const [rank1, setRank1] = useState();
    const [rank2, setRank2] = useState();

    async function fetch() {
        const url = "https://www.career.go.kr/inspct/openapi/test/report";
        const data = {
            "apikey": "238b48bf19364a4f775ccd83b30d13b3",
            "qestrnSeq": "6",
            "trgetSe": "100209",
            "name": props.params.name,
            "gender": props.params.gender,
            "grade": "2",
            "startDtm": props.params.startDtm,
            "answers": props.answers
          }
        axios.post(url, data)
        .then((response) => {
            console.log("web-result:", response.data.RESULT.url)
            const seq= response.data.RESULT.url.split('=')[1];
            console.log(seq);
            setSeq(seq);
        })
    }
    
    async function graph() {
        const resultURL = 'https://inspct.career.go.kr/inspct/api/psycho/report?seq=' + seq;
        // console.log(resultURL);
        const response = await axios.get(resultURL)
        console.log(response.data.result);
        setResult(response.data.result);
    }


    useEffect(() => {
        console.log(props.params);
        fetch();
    }, []);

    return(
        <>
        <h1>직업가치관검사 결과표</h1>
        
        <button onClick={()=>{
            console.log('결과보기');
            graph();
        }}>결과보기</button>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>성별</th>
                        <th>검사일</th>
                    </tr>
                    <tr>
                        <th>{props.params.name}</th>
                        <th>{props.params.gender}</th>
                        <td>{result.endDtm}</td>
                    </tr>
                </thead>
            </table>

            <p>{props.answers}</p>

            <div className ='chart' style={{height: "800px"}}>
            <ResponsiveBar
        data={[
            {
              "country": "AD",
              "hot dog": 124,
              "hot dogColor": "hsl(308, 70%, 50%)",
              "burger": 23,
              "burgerColor": "hsl(168, 70%, 50%)",
              "sandwich": 140,
              "sandwichColor": "hsl(103, 70%, 50%)",
              "kebab": 199,
              "kebabColor": "hsl(207, 70%, 50%)",
              "fries": 82,
              "friesColor": "hsl(340, 70%, 50%)",
              "donut": 61,
              "donutColor": "hsl(114, 70%, 50%)"
            },
            {
              "country": "AE",
              "hot dog": 128,
              "hot dogColor": "hsl(1, 70%, 50%)",
              "burger": 191,
              "burgerColor": "hsl(329, 70%, 50%)",
              "sandwich": 73,
              "sandwichColor": "hsl(324, 70%, 50%)",
              "kebab": 17,
              "kebabColor": "hsl(253, 70%, 50%)",
              "fries": 128,
              "friesColor": "hsl(357, 70%, 50%)",
              "donut": 105,
              "donutColor": "hsl(69, 70%, 50%)"
            },
            {
              "country": "AF",
              "hot dog": 194,
              "hot dogColor": "hsl(338, 70%, 50%)",
              "burger": 77,
              "burgerColor": "hsl(322, 70%, 50%)",
              "sandwich": 82,
              "sandwichColor": "hsl(230, 70%, 50%)",
              "kebab": 147,
              "kebabColor": "hsl(60, 70%, 50%)",
              "fries": 113,
              "friesColor": "hsl(177, 70%, 50%)",
              "donut": 112,
              "donutColor": "hsl(201, 70%, 50%)"
            },
            {
              "country": "AG",
              "hot dog": 171,
              "hot dogColor": "hsl(77, 70%, 50%)",
              "burger": 143,
              "burgerColor": "hsl(285, 70%, 50%)",
              "sandwich": 182,
              "sandwichColor": "hsl(195, 70%, 50%)",
              "kebab": 63,
              "kebabColor": "hsl(153, 70%, 50%)",
              "fries": 180,
              "friesColor": "hsl(85, 70%, 50%)",
              "donut": 17,
              "donutColor": "hsl(130, 70%, 50%)"
            },
            {
              "country": "AI",
              "hot dog": 114,
              "hot dogColor": "hsl(62, 70%, 50%)",
              "burger": 100,
              "burgerColor": "hsl(346, 70%, 50%)",
              "sandwich": 2,
              "sandwichColor": "hsl(243, 70%, 50%)",
              "kebab": 166,
              "kebabColor": "hsl(70, 70%, 50%)",
              "fries": 152,
              "friesColor": "hsl(244, 70%, 50%)",
              "donut": 174,
              "donutColor": "hsl(96, 70%, 50%)"
            },
            {
              "country": "AL",
              "hot dog": 194,
              "hot dogColor": "hsl(264, 70%, 50%)",
              "burger": 133,
              "burgerColor": "hsl(352, 70%, 50%)",
              "sandwich": 148,
              "sandwichColor": "hsl(222, 70%, 50%)",
              "kebab": 9,
              "kebabColor": "hsl(159, 70%, 50%)",
              "fries": 141,
              "friesColor": "hsl(303, 70%, 50%)",
              "donut": 3,
              "donutColor": "hsl(350, 70%, 50%)"
            },
            {
              "country": "AM",
              "hot dog": 144,
              "hot dogColor": "hsl(207, 70%, 50%)",
              "burger": 81,
              "burgerColor": "hsl(294, 70%, 50%)",
              "sandwich": 126,
              "sandwichColor": "hsl(313, 70%, 50%)",
              "kebab": 191,
              "kebabColor": "hsl(161, 70%, 50%)",
              "fries": 93,
              "friesColor": "hsl(153, 70%, 50%)",
              "donut": 156,
              "donutColor": "hsl(300, 70%, 50%)"
            }
          ]}
        keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
            </div>

        </div>

        <button>다시 검사하기</button> 
        </>
    )
}