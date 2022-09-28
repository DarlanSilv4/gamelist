import React, { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { ref, set } from "firebase/database";
import { database } from "@firebase/firebaseConfig";

import { useAuth } from "@contexts/AuthContext";

import Head from "@elements/Head";

import Default from "@layouts/Default";

import {
  Button,
  ButtonWrapper,
  Container,
  HelperText,
  Input,
  InputContainer,
  Label,
  State,
  TextInput,
  UserInfo,
} from "./EditProfile.element";

interface ErrorForm {
  field: "name" | "summary";
  message: string;
}

function EditProfile() {
  const router = useRouter();

  const [user, isLoading] = useAuth();

  const [profileName, setProfileName] = useState("");
  const [profileSummaray, setProfileSummaray] = useState("");

  const [error, setError] = useState<ErrorForm>();
  const [formState, setFormState] = useState<"sent" | "sending">();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    setProfileName(user.name);
    setProfileSummaray(user.profile_summary || "");
  }, [user, isLoading]);

  const isValidName = (name: string) => {
    const REG_NAME = /^([a-zA-Z]+\s?)+([a-zA-Z]?)+$/;

    if (REG_NAME.test(name)) {
      setError(undefined);
      return true;
    }

    setError({ field: "name", message: "The name is Invalid." });
    return false;
  };

  const isValidSummary = (summary: string) => {
    if (summary.length <= 160) {
      setError(undefined);
      return true;
    }

    setError({
      field: "summary",
      message: "Your summary cannot be longer than 160 characters",
    });
    return false;
  };

  const sendUserInfo = async (name: string, summary: string) => {
    if (name !== user?.name) {
      await set(ref(database, `users/${user?.id}/name`), name);
    }

    if (summary !== user?.profile_summary) {
      await set(ref(database, `users/${user?.id}/profile_summary`), summary);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      summary: { value: string };
    };

    const name = target.name.value.trim();
    const summary = target.summary.value.trim();

    if (isValidName(name) && isValidSummary(summary)) {
      setFormState("sending");
      await sendUserInfo(name, summary);
      setFormState("sent");
      return;
    }
  };

  return (
    <React.Fragment>
      <Head title="Gamelist" />
      <Default>
        <Container>
          <UserInfo onSubmit={(e) => handleSubmit(e)}>
            <div>
              <Label>
                <span>Profile Name</span>
                <InputContainer>
                  <Input
                    type="text"
                    name="name"
                    required
                    value={profileName}
                    error={error?.field === "name"}
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                  <span className="material-icons-round">edit</span>
                </InputContainer>
              </Label>
              <HelperText>
                {error?.field === "name" && error?.message}
              </HelperText>
            </div>

            {/*
             <div>
              <Label>
                <span>Nickname (custom url)</span>
                <InputContainer>
                  <Input required type="text" value="" />
                  <span className="material-icons-round">edit</span>
                </InputContainer>
              </Label>
            </div>
             */}

            <div>
              <Label>
                <span>Summary (Optional)</span>
                <InputContainer>
                  <TextInput
                    name="summary"
                    rows={5}
                    error={error?.field === "summary"}
                    value={profileSummaray}
                    onChange={(e) => setProfileSummaray(e.target.value)}
                  />
                  <span className="material-icons-round">edit</span>
                </InputContainer>
              </Label>
              <HelperText>
                {error?.field === "summary" && error?.message}
              </HelperText>
              {formState && (
                <State state={formState}>
                  {formState === "sending"
                    ? "Sending..."
                    : "Successfully updated your profile. It may take up to 10 minutes for your new information to show, please be patient."}
                </State>
              )}
            </div>
            <ButtonWrapper>
              <Button type="submit" value="Submit" />
            </ButtonWrapper>
          </UserInfo>
        </Container>
      </Default>
    </React.Fragment>
  );
}

export default EditProfile;
