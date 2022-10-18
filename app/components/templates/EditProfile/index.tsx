import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useAuth } from "@contexts/AuthContext";

import Head from "@elements/Head";

import Default from "@layouts/Default";

import {
  checkUsername,
  updateName,
  updateSummary,
  updateUsername,
} from "@lib/user";

import {
  Button,
  ButtonWrapper,
  Container,
  HelperText,
  Input,
  InputContainer,
  Label,
  Spinner,
  State,
  TextInput,
  UserInfo,
} from "./EditProfile.element";

interface ErrorForm {
  field: "name" | "summary" | "username";
  message: string;
}

function EditProfile() {
  const router = useRouter();

  const [user, isLoading] = useAuth();

  const [profileName, setProfileName] = useState("");
  const [profileSummaray, setProfileSummaray] = useState("");
  const [username, setUsername] = useState("");

  const [error, setError] = useState<ErrorForm>();
  const [formState, setFormState] = useState<"sent" | "sending">();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    setProfileName(user.name);
    setUsername(user.username || "");
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

  const isValidUsername = async (username: string) => {
    const REG_USERNAME = new RegExp("^([a-zA-Z0-9_]{6,20}$)+");
    const isUsernameAlreadyExists = await checkUsername(username);

    if (user?.username === username) return true;

    if (!REG_USERNAME.test(username)) {
      setError({
        field: "username",
        message:
          "The username is Invalid. Please use only letters and underscore. Number of characters must be between 6 to 20.",
      });
      return false;
    }

    if (username.startsWith("_") || username.endsWith("_")) {
      setError({
        field: "username",
        message: "Username cannot start or end with an underscore.",
      });
      return false;
    }

    if (username.includes("__")) {
      setError({
        field: "username",
        message: "Underscore can't be used multiple times in a row.",
      });
      return false;
    }

    if (isUsernameAlreadyExists) {
      setError({
        field: "username",
        message: "This username is already in use.",
      });
      return false;
    }

    setError(undefined);
    return true;
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

  const sendUserInfo = async (
    name: string,
    summary: string,
    username: string
  ) => {
    if (user) {
      await updateName(user, name);
      await updateUsername(user, username);
      await updateSummary(user, summary);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      summary: { value: string };
      username: { value: string };
    };

    const name = target.name.value.trim();
    const summary = target.summary.value.trim();
    const username = target.username.value.trim();

    if (
      isValidName(name) &&
      isValidSummary(summary) &&
      (await isValidUsername(username))
    ) {
      setFormState("sending");
      await sendUserInfo(name, summary, username);
      setFormState("sent");
      return;
    }
  };

  return (
    <React.Fragment>
      <Head title="Gamelist" />
      <Default>
        {isLoading || !user ? (
          <Spinner />
        ) : (
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

              <div>
                <Label>
                  <span>Username (custom url)</span>
                  <InputContainer>
                    <Input
                      required
                      type="text"
                      name="username"
                      value={username}
                      error={error?.field === "username"}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <span className="material-icons-round">edit</span>
                  </InputContainer>
                </Label>
                <HelperText>
                  {error?.field === "username" && error?.message}
                </HelperText>
              </div>

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
              </div>
              {formState && (
                <State state={formState}>
                  {formState === "sending"
                    ? "Sending..."
                    : "Successfully updated your profile. It may take up to 10 minutes for your new information to show, please be patient."}
                </State>
              )}
              <ButtonWrapper>
                <Button type="submit" value="Submit" />
              </ButtonWrapper>
            </UserInfo>
          </Container>
        )}
      </Default>
    </React.Fragment>
  );
}

export default EditProfile;
