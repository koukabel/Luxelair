import { getUserSessionIdFromCookie } from "../utils/cookie";
import { IncomingMessage } from "node:http";

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
});
