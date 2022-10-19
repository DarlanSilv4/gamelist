import React from "react";

import Image from "next/image";

import Header from "@modules/Header";

import {
  DevelopInfo,
  Footer,
  Github,
  GithubIcon,
  Main,
} from "./Default.element";

interface Props {
  children: React.ReactNode;
}

function Default({ children }: Props) {
  return (
    <React.Fragment>
      <Header />
      <Main>{children}</Main>
      <Footer>
        <DevelopInfo>
          <span>
            Developed by{" "}
            <a target="_blank" href="https://github.com/DarlanSilv4">
              Darlan Silva
            </a>
          </span>
          <span>•</span>
          <span>
            Powered by{" "}
            <a target="_blank" href="https://www.igdb.com/">
              IGDB
            </a>
          </span>
        </DevelopInfo>
        <Github
          href="https://github.com/DarlanSilv4/gamelist"
          title="GitHub Page"
          target="_blank"
        >
          <GithubIcon>
            <Image src="/svg/github_logo.svg" layout="fill" />
          </GithubIcon>
        </Github>
      </Footer>
    </React.Fragment>
  );
}

export default Default;
