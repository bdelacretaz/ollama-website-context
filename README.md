# Contextualizing an Ollama model from web content

This experiment adds context to an Ollama model, by
retrieving content from a list of URLs.

The first variant is simplistic, it just adds MESSAGE
instructions to an Ollama [https://github.com/ollama/ollama/blob/main/docs/modelfile.md](Modelfile)

It works, but only within the size of the model's context. It looks like MESSAGE instructions found earlier in the Modelfile are forgotten first.

One obivous workaround is to use RAG instead, and include only elements which are
related to the current query in the context.

## How to test this

Here's how to create your own custom model, after adapting
the `modelhead.txt` and `urls.txt` files as desired:

- Run `npm install` once to install dependencies
- Run `npm start` to retrieve content from the specified URLs and generate the `Modelfile`
- Run `ollama create custom -f Modelfile` to create the Ollama model
- Run `ollama run custom` to run it, and enjoy!

See the code for more details.
