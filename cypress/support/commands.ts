/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

export {};

/** Commands types */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Logs in user with provided user credentials.
       *
       * @returns {typeof login}
       * @memberof Chainable
       */
      login: typeof login;

      /**
       * Sign up a new user, can pass organization id to simulate navigating to invitation created by an organization
       *
       * @returns {typeof signUp}
       * @memberof Chainable
       */
      // signUp: typeof signUp;

      /**
       * Sign out a user
       *
       * @returns {typeof signUp}
       * @memberof Chainable
       */
      // logout: typeof logout;

      /**
       * Run a shell command and assert that it succeeds
       * @param {string} command
       * @param {Partial<Cypress.ExecOptions>} [options]
       * @returns {typeof runShellCommand}
       * @memberof Chainable
       */
      runShellCommand: typeof runShellCommand;

      /**
       * Wait for a shell command to succeed or timeout
       * @param command
       * @param timeoutSec
       * @returns {typeof waitForShellCommandSuccess}
       * @memberof Chainable
       */
      waitForShellCommandSuccess: typeof waitForShellCommandSuccess;

      /**
       * Query a button within an element
       * @param elementDataCy
       * @param buttonText
       * @returns {typeof queryButtonWithinElement}
       * @memberof Chainable
       */
      queryButtonWithinElement: typeof queryButtonWithinElement;


      /*
       * Press the esc key
       * You can use it for closing modals for example
       *
       * @returns {typeof pressEsc}
       * @memberof Chainable
       */
      pressEsc: typeof pressEsc;

      /**
       * Logs out the user
       * @returns {typeof logout}
       * @memberof Chainable
       */
      logout: typeof logout;

      /**
       * Clicks on any element with the specific data-cy attribute
       * @param dataCy
       * @returns {typeof clickDataCy}
       * @memberof Chainable
       */
      clickDataCy: typeof clickDataCy;

      /**
       * Navigates by triggering a click on side bar nav button element.
       * @param button represents the button name.
       * @returns {typeof sideBarNavigation}
       * @memberof Chainable
       */
      sideBarNavigation: typeof sideBarNavigation;

      /**
       * Query element by data-cy attribute
       *
       * @param {string} dataCy
       * @returns {typeof Chainable}
       * @memberof Chainable
       * @example cy.getByDataCy('my-data-cy-value')
       */
      getByDataCy: typeof getByDataCy;
    }
  }
}


/** Commands definition */
function runShellCommand(
  command: string,
  options?: Partial<Cypress.ExecOptions> | undefined,
) {
  return cy
    .exec(command, { failOnNonZeroExit: false, ...options })
    .then((result) => {
      if (result.code) {
        throw new Error(`Execution of "${command}" failed
        Exit code: ${result.code}
        Stdout:\n${result.stdout}
        Stderr:\n${result.stderr}`);
      }
      // cy.log(result.stdout);
      // expect(result.code).equal(0);
      return result;
    });
}

function waitForShellCommandSuccess(command: string, timeoutSec: number) {
  // Same as runShellCommand but with wait and retry until success or timeout
  const commandWithRetries = `success=0; timeout=${timeoutSec}; delay=0.2; end_time=$((SECONDS+timeout)); while [[ $SECONDS -lt $end_time && 1 -ne $success ]]; do ${command} && success=1 || sleep $delay; done; if [ $success -ne 1 ]; then echo "Timeout reached or command failed" && exit 1; else echo "Command succeeded" && exit 0; fi`;

  cy.runShellCommand(commandWithRetries, { timeout: timeoutSec * 1000 });
}

function pressEsc() {
  cy.get('body').type('{esc}');
}

const queryButtonWithinElement = (
  elementDataCy: string,
  buttonText: string,
) => {
  cy.getByDataCy(elementDataCy).within(() => {
    cy.get('button').contains(buttonText).click({ force: true });
  });
};

const clickDataCy = (dataCy: string) => {
  cy.getByDataCy(dataCy).click();
};


function getByDataCy(
  dataCy: string,
  options?: Partial<
    Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow
  >,
) {
  return cy.get(`[data-cy="${dataCy}"]`, options);
}



function login(email?: string, useSession: boolean = true) {
  // Define loginWithEmail function
  function loginWithEmail() {
    cy.get('input[placeholder="Enter your email"]').type(
      email || Cypress.env('TEST_USER_EMAIL'),
    );
    cy.get('button').contains('Login').click();
  }


  // Main login function logic
  if (useSession) {
    cy.session(`login-${email || Cypress.env('TEST_USER_EMAIL')}`, () => {
      cy.visit(
        Cypress.env('isLocal')
          ? 'http://localhost:8080'
          : '/?bypass-recaptcha=true',
      );
      loginWithEmail();
      if (!Cypress.env('isLocal')) {

        cy.location().should(({ pathname }) =>
          expect(pathname === Cypress.env('APP_URL')),
        );
      } else {
        // An indication that we logged in successfully and the app's default page is loaded
        cy.getByDataCy('name-initials-logout-button');
      }
    });
  } else {
    loginWithEmail();
  }
}


function logout() {
  cy.getByDataCy('name-initials-logout-button').click();
  cy.contains('Log out').click();
}

function sideBarNavigation(buttonName: keyof typeof SideBarNavButtons) {
  cy.log(`click on nav button: ${buttonName}`);
  cy.get(SideBarNavButtons[buttonName].selector).click();

  cy.log('waiting for the correct route to be rendered');
  const expectedRoute = SideBarNavButtons[buttonName].route;
  cy.location().should(({ pathname }) => expect(pathname === expectedRoute));
}

const SideBarNavButtons = {
  Organizations: {
    selector: '[data-cy="side-bar-navigation-button-Organization"]',
    route: '/organization',
  },
  AccessGraph: {
    selector: '[data-cy="side-bar-navigation-button-Access graph"]',
    route: '/access-graph',
  },
  Environments: {
    selector: '[data-cy="side-bar-navigation-button-Environments"]',
    route: '/environments',
  },
  Integrations: {
    selector: '[data-cy="side-bar-navigation-button-Integrations"]',
    route: '/integrations',
  },
} as const;



/** Commands registration */

/** General Utils Commands */
Cypress.Commands.add('runShellCommand', runShellCommand);
Cypress.Commands.add('waitForShellCommandSuccess', waitForShellCommandSuccess);
Cypress.Commands.add('pressEsc', pressEsc);
Cypress.Commands.add('queryButtonWithinElement', queryButtonWithinElement);
Cypress.Commands.add('getByDataCy', getByDataCy);
Cypress.Commands.add('clickDataCy', clickDataCy);

/** App specific commands */
Cypress.Commands.add('sideBarNavigation', sideBarNavigation);
Cypress.Commands.add('login', login);
Cypress.Commands.add('logout', logout);
