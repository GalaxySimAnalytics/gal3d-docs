Welcome to the Gal3D documentation! `Gal3D <https://github.com/GalaxySimAnalytics/gal3d>`_ is a Python library for three-dimensional morphological modeling of simulated galaxies.
It measures structural properties directly from particle data, including axis ratios, orientations, center offsets, and higher-order shape features.


Installation
============

Clone the repository and install the package:

.. code-block:: bash

   git clone https://github.com/GalaxySimAnalytics/gal3d.git
   cd gal3d
   pip install .

For editable development:

.. code-block:: bash

   pip install -e .



Scientific Motivation
=====================

The intrinsic three-dimensional shapes of galaxies encode important information about their formation and evolution. 
In simulations, particle data provide direct access to the full 3D mass distribution, but robustly measuring radial variations in shape remains challenging.

``Gal3D`` is designed to address this problem. It combines density-field reconstruction, radial sampling, and superellipsoid fitting to model the 3D iso-density 
structure of galaxies and to quantify quantities such as axis ratios, orientations, center offsets, and higher-order shape features.


Citation
========

If you use Gal3D in your research or project, please cite the following paper.

Lu, S., & Du, M. 2026, ApJ, 1008, 223. doi:`10.3847/1538-4357/ae994c <https://doi.org/10.3847/1538-4357/ae994c>`_

BibTeX:

::

    @article{Lu_2026,
      doi = {10.3847/1538-4357/ae994c},
      url = {https://doi.org/10.3847/1538-4357/ae994c},
      year = {2026},
      month = {sep},
      publisher = {The American Astronomical Society},
      volume = {1008},
      number = {2},
      pages = {223},
      author = {Lu, Shuai and Du, Min},
      title = {Gal3D: Superellipsoid Modeling of Radial Three-dimensional Galaxy Structure in IllustrisTNG and EAGLE Simulations},
      journal = {The Astrophysical Journal},
    }



Documentation Contents
======================

This documentation is organized into three main parts:

- :ref:`Tutorials <tutorials>`: basic usage, key features, and advanced examples.
- :ref:`Implementation Details <details>`: technical descriptions of the underlying methods and modules.
- :ref:`Reference <reference>`: the full API reference.

.. toctree::
   :maxdepth: 2

   Tutorials <tutorials/index>
   Implementation Details <details/index>
   Reference <reference/index>
