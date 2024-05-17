import {
  getUserSessionIdFromCookie,
  setUserSessionIdInCookie,
} from "../utils/cookie";
import { IncomingMessage } from "node:http";
import { getMockRes } from "@jest-mock/express";
import UserSession from "../entities/userSession";

describe("getUserSessionIdFromCookie", () => {
  describe("when request has no cookies", () => {
    it("returns undefined", () => {
      const req = { headers: { cookie: undefined } } as IncomingMessage;
      expect(getUserSessionIdFromCookie(req)).toBeUndefined();
    });
  });
  describe("when request has cookies", () => {
    describe("when cookie has no key userSessionId", () => {
      it("returns undefined", () => {
        const req = { headers: { cookie: "random=test" } } as IncomingMessage;
        expect(getUserSessionIdFromCookie(req)).toBeUndefined();
      });
    });
    describe("when cookie has key userSessionId", () => {
      describe("when key has empty value", () => {
        it("returns undefined", () => {
          const req = {
            headers: { cookie: "random=test; userSessionId=" },
          } as IncomingMessage;
          expect(getUserSessionIdFromCookie(req)).toBeUndefined();
        });
      });
      describe("when key has not empty value", () => {
        it("returns user session ID", () => {
          const req = {
            headers: { cookie: "random=test; userSessionId=test" },
          } as IncomingMessage;
          expect(getUserSessionIdFromCookie(req)).toEqual("test");
        });
      });
    });
  });

  describe("setUserSessionIdInCookie", () => {
    describe("when session is provided", () => {
      it("sets userSessionId cookie with session id", () => {
        const { res } = getMockRes();

        const session = new UserSession();
        session.id = "test_session_id";

        setUserSessionIdInCookie(res, session);

        expect(res.cookie).toHaveBeenCalledWith(
          "userSessionId",
          session.id,
          expect.objectContaining({
            secure: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
          })
        );
      });
    });

    describe("when session is null", () => {
      it("clears userSessionId cookie", () => {
        const { res } = getMockRes();

        setUserSessionIdInCookie(res, null);

        expect(res.clearCookie).toHaveBeenCalledWith("userSessionId");
      });
    });
  });
});
