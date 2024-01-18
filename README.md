# 2324-WTA-Portfolio_API

Create your custom portfolio with following projects:

- [Portfolio_CMS](https://github.com/SennaUyttersprot03/2324-WTA-Portfolio_CMS)
- [Portfolio_JAMSTACK](https://gitlab.com/jente.decamps/2324-wta-portfolio-jamstack)

This is a portfolio API made with GraphQL created for [Portfolio_CMS](https://github.com/SennaUyttersprot03/2324-WTA-Portfolio_CMS) & [Portfolio_JAMSTACK](https://gitlab.com/jente.decamps/2324-wta-portfolio-jamstack).

## Authors

- [Senna Uyttersprot](https://gitlab.com/senna.uyttersprot)
- [Jente De Camps](https://gitlab.com/jente.decamps)

## Requirements

For this project is the installation of [Deno](https://docs.deno.com/runtime/manual) required.

## Getting Started

Clone this project into your own repository.

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JAMSTACK_URL`: this is the deploy hook of your JAMSTACK portfolio to trigger the automatic deployments.

### Run the development server

After running the following command your GraphQL playground will start.

```bash
  deno task dev
```

## Deployment

Deploy this project with [Deno Deploy](https://deno.com/deploy) and connect with your GitHub account.

Don't forget to set up your environment variables under the settings tab.

**Attention**: Please note that this project uses DenoKv, which can be used with Deno Deploy without additional configuration.
If you use another hosting provider, read more about the [extra configuration](https://docs.deno.com/kv/manual/on_deploy#connect-to-managed-databases-from-outside-of-deno-deploy) of DenoKV.
