import { SubscriptionIcon } from "../ui-component/icons/icons";
import { sampleIcon } from "../ui-component/icons/icons";

const subscribe = {
    id: "subscribe",
    title: "구독",
    type: "group",
    children: [
        {
            id: "fee",
            title: "실시간 이용요금",
            type: "item",
            url: "/subscribe/fee",
            icon: sampleIcon,
            breadcrumbs: false,
        },
        {
            id: "bill",
            title: "청구서",
            type: "item",
            url: "/subscribe/bill",
            icon: sampleIcon,
            breadcrumbs: false,
        },
        {
            id: "subscription",
            title: "구독현황",
            type: "item",
            url: "/subscribe/info",
            icon: SubscriptionIcon,
            breadcrumbs: false,
        },
    ],
};

export default subscribe;
