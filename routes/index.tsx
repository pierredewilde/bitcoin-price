/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

export interface Price {
  time: Time;
  disclaimer: string;
  chartName: string;
  bpi: Bpi;
}

const url = "https://api.coindesk.com/v1/bpi/currentprice.json";

export interface Time {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export interface Bpi {
  USD: Usd;
  GBP: Gbp;
  EUR: Eur;
}

export interface Usd {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Gbp {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Eur {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export const handler: Handlers<Price | null> = {
  async GET(_, ctx) {
    const resp = await fetch(url);
    if (resp.status === 200) {
      const price: Price = await resp.json();
      return ctx.render(price);
    } else {
      return ctx.render(null);
    }
  },
};

export default function Home({ data }: PageProps<Price | null>) {
  if (!data) {
    return <h1>Bitcoin Price is not available</h1>;
  }
  return (
    <div class={tw`w-screen h-screen bg-gray-800`}>
      <div class={tw`p-8 mx-auto max-w-screen-md`}>
        <img
          src="/Bitcoin.svg"
          width="200px"
          class="mx-auto"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class={tw`my-10 text(center 3xl white)`}>Bitcoin Price</p>
        <p class={tw`my-10 text(center 2xl white)`}>USD: $ {data.bpi.USD.rate}</p>
        <p class={tw`my-10 text(center 2xl white)`}>EUR: € {data.bpi.EUR.rate}</p>
        <p class={tw`my-10 text(center sm white)`}>Last fetched at {data.time.updated}</p>
      </div>
    </div>
  );
}
