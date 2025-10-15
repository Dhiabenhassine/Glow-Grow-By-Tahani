"use client"

import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import IconButton from "@mui/material/IconButton"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import CircularProgress from "@mui/material/CircularProgress"
import Alert from "@mui/material/Alert"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import CloseIcon from "@mui/icons-material/Close"
import { styled } from "@mui/material/styles"

const Input = styled("input")({ display: "none" })

export default function CoursesManagement() {
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [packs, setPacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    pack_id: "",
    level: "",
    is_published: false,
    coach_name: "Tahani Kochrad",
  })
  const [images, setImages] = useState([])
  const [imageLoading, setImageLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  const API_BASE = import.meta.env.VITE_API_BASE_ADMIN

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  useEffect(() => {
    fetchCourses()
    fetchCategories()
    fetchPacks()
  }, [])

  const handleUnauthorized = () => {
    localStorage.removeItem("token")
    alert("Session expired. Please log in again.")
    window.location.href = "/login"
  }

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/courses`, { headers: getAuthHeaders() })
      if (res.status === 401) return handleUnauthorized()
      const data = await res.json()
      const coursesWithImages = await Promise.all(
        data.map(async (course) => {
          try {
            const imgRes = await fetch(`${API_BASE}/courses/${course.id}/images`, { headers: getAuthHeaders() })
            if (imgRes.ok) {
              const images = await imgRes.json()
              return {
                ...course,
                image_url: images.length > 0 ? images[0].image_url : null,
              }
            }
          } catch (err) {
            console.log("[v0] Failed to fetch images for course:", course.id, err)
          }
          return course
        }),
      )

      setCourses(coursesWithImages)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/categories`, { headers: getAuthHeaders() })
      if (res.status === 401) return handleUnauthorized()
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const fetchPacks = async () => {
    try {
      const res = await fetch(`${API_BASE}/packs`, { headers: getAuthHeaders() })
      if (res.status === 401) return handleUnauthorized()
      const data = await res.json()
      setPacks(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const fetchImages = async (courseId) => {
    try {
      setImageLoading(true)
      const res = await fetch(`${API_BASE}/courses/${courseId}/images`, { headers: getAuthHeaders() })
      if (res.status === 401) return handleUnauthorized()
      const data = await res.json()
      setImages(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setImageLoading(false)
    }
  }

  const handleOpenDialog = (course) => {
    if (course) {
      setEditingCourse(course)
      setFormData({
        title: course.title,
        description: course.description,
        category_id: course.category_id,
        pack_id: course.pack_id || "",
        level: course.level || "",
        is_published: course.is_published,
        coach_name: course.coach_name || "Tahani Kochrad",
      })
      fetchImages(course.id)
    } else {
      setEditingCourse(null)
      setFormData({
        title: "",
        description: "",
        category_id: "",
        pack_id: "",
        level: "",
        is_published: false,
        coach_name: "Tahani Kochrad",
      })
      setImages([])
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingCourse(null)
    setImages([])
  }

  const handleSubmit = async () => {
    try {
      const url = editingCourse ? `${API_BASE}/courses/${editingCourse.id}` : `${API_BASE}/courses`
      const method = editingCourse ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(formData),
      })

      if (res.status === 401) return handleUnauthorized()
      if (!res.ok) throw new Error("Failed to save course")

      handleCloseDialog()
      fetchCourses()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return
    try {
      const res = await fetch(`${API_BASE}/courses/${id}`, { method: "DELETE", headers: getAuthHeaders() })
      if (res.status === 401) return handleUnauthorized()
      if (!res.ok) throw new Error("Failed to delete course")
      fetchCourses()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleUploadImage = async (e) => {
    if (!editingCourse) return
    const file = e.target.files[0]
    if (!file) return

    const form = new FormData()
    form.append("file", file)

    try {
      setImageLoading(true)
      const res = await fetch(`${API_BASE}/courses/${editingCourse.id}/images`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: form,
      })
      if (!res.ok) throw new Error("Failed to upload image")
      fetchImages(editingCourse.id)
    } catch (err) {
      setError(err.message)
    } finally {
      setImageLoading(false)
    }
  }

  const handleDeleteImage = async (imageId) => {
    if (!confirm("Delete this image?")) return
    try {
      const res = await fetch(`${API_BASE}/images/${imageId}`, { method: "DELETE", headers: getAuthHeaders() })
      if (!res.ok) throw new Error("Failed to delete image")
      fetchImages(editingCourse.id)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl)
  }

  const handleClosePreview = () => {
    setPreviewImage(null)
  }

  // Filter categories based on selected pack
  const filteredCategories = categories.filter((c) => c.pack_id === formData.pack_id)

  if (loading) return <CircularProgress sx={{ display: "block", margin: "40px auto" }} />

  return (
    <Box>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <h2 className="text-2xl font-semibold">Courses Management</h2>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Add Course
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Pack</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Coach</TableCell>
              <TableCell>Published</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No courses found.
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                
                <TableRow key={course.id} hover>
                  <TableCell>
                    {course.image_url ? (
                      <img
                        src={course.image_url || "/placeholder.svg"}
                        alt={course.title}
                        style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4, cursor: "pointer" }}
                        onClick={() => handleImageClick(course.image_url)}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: "grey.200",
                          borderRadius: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "grey.500",
                        }}
                      >
                        <PhotoCamera />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.category_name || "N/A"}</TableCell>
<TableCell>
  {packs.find(p => p._id === course.pack_id)?.name || "N/A"}
</TableCell>
                  
                  <TableCell>{course.level}</TableCell>
                  <TableCell>{course.coach_name}</TableCell>
                  <TableCell>{course.is_published ? "Yes" : "No"}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenDialog(course)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(course.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCourse ? "Edit Course" : "Add Course"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
      <FormControl fullWidth>
  <InputLabel>Pack</InputLabel>
  <Select
    value={formData.pack_id}
    onChange={(e) => {
      const selectedPack = packs.find((p) => p._id === e.target.value)
      setFormData({
        ...formData,
        pack_id: e.target.value,
        category_id: selectedPack ? selectedPack.category_id : "", // auto set category
      })
    }}
  >
    {packs.map((p) => (
      <MenuItem key={p._id} value={p._id}>
        {p.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

         <FormControl fullWidth>
  <InputLabel>Category</InputLabel>
  <Select value={formData.category_id} disabled>
    {categories.map((c) => (
      <MenuItem key={c._id} value={c._id}>
        {c.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
            />
            <FormControl fullWidth>
              <InputLabel>Level</InputLabel>
              <Select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })}>
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Coach Name"
              value={formData.coach_name}
              onChange={(e) => setFormData({ ...formData, coach_name: e.target.value })}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                />
              }
              label="Published"
            />

            {editingCourse && (
              <Box>
                <label htmlFor="upload-photo">
                  <Input accept="image/*" id="upload-photo" type="file" onChange={handleUploadImage} />
                  <Button variant="outlined" component="span" startIcon={<PhotoCamera />}>
                    Upload Image
                  </Button>
                </label>

                {imageLoading && <CircularProgress size={24} sx={{ ml: 2 }} />}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                    mt: 2,
                  }}
                >
                  {images.map((img) => (
                    <Box key={img.id} sx={{ position: "relative" }}>
                      <img
                        src={img.image_url || "/placeholder.svg"}
                        alt=""
                        width={380}
                        height={380}
                        style={{ objectFit: "cover", display: "block" }}
                      />
                      <IconButton
                        size="small"
                        color="error"
                        sx={{ position: "absolute", top: 8, right: 8 }}
                        onClick={() => handleDeleteImage(img.id)}
                      >
                        X
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.title || !formData.category_id || !formData.pack_id || !formData.level}
          >
            {editingCourse ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!previewImage} onClose={handleClosePreview} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Course Image
          <IconButton onClick={handleClosePreview} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
            {previewImage && (
              <img
                src={previewImage || "/placeholder.svg"}
                alt="Course preview"
                style={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain" }}
              />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
