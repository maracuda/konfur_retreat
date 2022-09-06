import React from "react";
import {Page} from "../controls/Page/Page";
import {Link} from "@skbkontur/react-ui";
import {Spacer} from "../controls/Spacer/Spacer";
import { WebApi } from "../../WebApiProvider";
import {RetreatStatistics} from "../../../contracts/RetreatStatistics";
import {types} from "sass";

interface State {
    stats: Nullable<RetreatStatistics>[];
}

export default class MainPage extends React.Component<unknown, State> {
    public state: Readonly<State> = {
        stats: null,
    };


    public async componentDidMount(): Promise<void> {
        const stats = await WebApi.RetreatStatisticsApi.list();
        this.setState({ stats: stats! })
    }

    public render(): React.ReactNode {

        if (this.state.stats === null) {
            return (
                <div>Empty now</div>
            )
        } else {
            return (
                <Page header={"Заголовок главной страницы"}>
                    <div>Привет! Вы находитесь во фронтовом шаблоне</div>
                    <table>
                        <th>Заголовок 1</th>
                        <th>Заголовок 2</th>
                        {this.state.stats!.map(s => <tr>
                            <td>{s!.id}</td>
                            <td>{s!.clicksCount}</td>
                        </tr>)}
                    </table>
                    <Spacer gap={10}/>
                    <Link href={"/error"}>Перейти на несуществующий роут</Link>
                </Page>
            );
        }

    }
}