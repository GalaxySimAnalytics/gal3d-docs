UV := $(shell command -v uv 2>/dev/null)

.PHONY: setup api docs docs-zh live live-zh i18n clean help

setup:
	@[ -n "$(UV)" ] || { \
		echo "Error: uv not found."; \
		echo "Install: curl -LsSf https://astral.sh/uv/install.sh | sh"; \
		exit 1; \
	}
	uv sync
	@echo "Docs environment ready."

api:
	bash docs/source/gen_api.sh

docs:
	$(MAKE) -C docs html-en

docs-zh:
	$(MAKE) -C docs html-zh

live:
	$(MAKE) -C docs autobuild-en

live-zh:
	$(MAKE) -C docs autobuild-zh

i18n:
	$(MAKE) -C docs i18n-all

clean:
	rm -rf docs/build

help:
	@echo "Available targets:"
	@echo "  make setup    - create/update uv environment"
	@echo "  make api      - regenerate API rst files"
	@echo "  make docs     - build English HTML docs"
	@echo "  make docs-zh  - build Chinese HTML docs"
	@echo "  make live     - live preview for English docs"
	@echo "  make live-zh  - live preview for Chinese docs"
	@echo "  make i18n     - update translation catalogs"
	@echo "  make clean    - remove built docs"