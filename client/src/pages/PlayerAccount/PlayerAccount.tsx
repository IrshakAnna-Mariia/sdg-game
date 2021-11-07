import React from "react";
import {Steps, Popover, Rate, Avatar} from 'antd';
import {PlayerAccountProps, customDotArg} from "./PlayerAccount.types";
import {FrownOutlined, MehOutlined, SmileOutlined} from "@ant-design/icons";

const {Step} = Steps;

const customIcons = [
    <FrownOutlined />,
    <FrownOutlined />,
    <MehOutlined />,
    <SmileOutlined />,
    <SmileOutlined />,
];


const PlayerAccount: React.FC<PlayerAccountProps> = () => {
    const customDot = (
        dot: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined,
        { status, index }: customDotArg
    ) => {
        return (
            <Popover content={<span>step {index} status: {status}</span>}>
                {dot}
            </Popover>
        )
    };

    return <>
        <Avatar src="https://joeschmoe.io/api/v1/random" />
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>

        <Steps current={1} progressDot={customDot}>
            <Step title="Finished" description="Topic 1"/>
            <Step title="In Progress" description="Topic 2"/>
            <Step title="Waiting" description="Topic 3"/>
        </Steps>

        <>
            <Rate defaultValue={2} character={({ index }: {index: number}) => index + 1} />
            <br />
            <Rate defaultValue={3} character={({ index }: { index: number }) => customIcons[index + 1]} />
        </>
    </>
}

export default PlayerAccount;
