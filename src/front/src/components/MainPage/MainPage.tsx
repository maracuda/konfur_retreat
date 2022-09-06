import React from "react";
import {Page} from "../controls/Page/Page";
import {Link} from "@skbkontur/react-ui";
import {Spacer} from "../controls/Spacer/Spacer";
import { WebApi } from "../../WebApiProvider";

export const MainPage = async () => {

    const stats = await WebApi.RetreatStatisticsApi.list();
    console.log(stats);

    return (
        <Page header={"Заголовок главной страницы"}>
            <div>Привет! Вы находитесь во фронтовом шаблоне</div>
            <table>
                <th>Заголовок 1</th>
                <th>Заголовок 2</th>
                <tr>
                    <td>Значение 1</td>
                    <td>Значение 2</td>
                </tr>
            </table>
            <Spacer gap={10}/>
            <Link href={"/error"}>Перейти на несуществующий роут</Link>
        </Page>
    );
};

MainPage.displayName = "MainPage";