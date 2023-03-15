import {
  Badge,
  Button,
  Center,
  Group,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import React, { useState } from "react";
import {
  IconHomeStar,
  IconSettings,
  IconBooks,
  IconMessageCircle2,
  IconUsers,
} from "@tabler/icons";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";

type Props = {
  user: any;
  selectedTab: string;
};

function CustomNavbar({ user, selectedTab }: Props) {
  return (
    <Center h="100%">
      <Stack spacing={60} mr="sm">
        {
          user?.customClaims?.admin &&
          <Center>
            {/* <Text color="red" weight={"bold"} size="lg">ADMIN</Text> */}
            <Badge color="red" variant="outline" size="lg">ADMIN</Badge>
          </Center>

        }
        <Center>
          <UserAvatar isSelected={selectedTab === "user"} />
        </Center>
        <Link href={`/`}>
          <UnstyledButton>
            <Group position="center">
              <IconHomeStar
                color={selectedTab == "home" ? "#228be6" : "gray"}
                fontWeight={selectedTab == "home" ? "#228be6" : "gray"}
              />
              <Text
                color={selectedTab == "home" ? "#228be6" : "gray"}
                weight={selectedTab == "home" ? "bold" : "normal"}
              >
                Home
              </Text>
            </Group>
          </UnstyledButton>
        </Link>

        {
          user?.customClaims?.admin ? (
            <Link href={`/students`}>
              <UnstyledButton>
                <Group position="center">
                  <IconUsers
                    color={selectedTab == "students" ? "#228be6" : "gray"}
                    fontWeight={selectedTab == "students" ? "bold" : "regular"}
                  />
                  <Text
                    color={selectedTab == "students" ? "#228be6" : "gray"}
                    weight={selectedTab == "students" ? "bold" : "normal"}
                  >
                    Students
                  </Text>
                </Group>
              </UnstyledButton>
            </Link>

          ) : (
            <Link href={`/courses`}>
              <UnstyledButton>
                <Group position="center">
                  <IconBooks
                    color={selectedTab == "courses" ? "#228be6" : "gray"}
                    fontWeight={selectedTab == "courses" ? "bold" : "regular"}
                  />
                  <Text
                    color={selectedTab == "courses" ? "#228be6" : "gray"}
                    weight={selectedTab == "courses" ? "bold" : "normal"}
                  >
                    Courses
                  </Text>
                </Group>
              </UnstyledButton>
            </Link>

          )

        }


        <Link href={`/support`}>
          <UnstyledButton>
            <Group position="center">
              <IconMessageCircle2
                color={selectedTab == "support" ? "#228be6" : "gray"}
                fontWeight={selectedTab == "support" ? "bold" : "regular"}
              />
              <Text
                color={selectedTab == "support" ? "#228be6" : "gray"}
                weight={selectedTab == "support" ? "bold" : "normal"}
              >
                Support
              </Text>
            </Group>
          </UnstyledButton>
        </Link>
      </Stack>

    </Center>
  );
}

export default CustomNavbar;
